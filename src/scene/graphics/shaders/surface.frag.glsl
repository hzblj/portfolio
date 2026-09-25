uniform vec2 uSize;
uniform float uRadius;
uniform float uOpacity;
uniform vec4 uFill;
uniform vec4 uBorder;
uniform float uBorderWidth;
uniform float uBorderAngle;
uniform float uGlass;
uniform sampler2D uBackdrop;
uniform vec2 uResolution;
uniform float uDim;
uniform float uSolid;

varying vec2 vUv;

const vec3 SMOKE = vec3(10.0 / 255.0);
const float SMOKE_ALPHA = 0.6;

float gradientAt(vec2 p, vec2 size, float degrees) {
  float angle = radians(degrees);
  vec2 direction = vec2(sin(angle), -cos(angle));
  float span = abs(size.x * sin(angle)) + abs(size.y * cos(angle));

  return dot(p, direction) / span + 0.5;
}

float stops(float t, vec4 at, vec4 alpha) {
  if (t <= at.x) return alpha.x;
  if (t <= at.y) return mix(alpha.x, alpha.y, (t - at.x) / (at.y - at.x));
  if (t <= at.z) return mix(alpha.y, alpha.z, (t - at.y) / (at.z - at.y));
  if (t <= at.w) return mix(alpha.z, alpha.w, (t - at.z) / (at.w - at.z));
  return alpha.w;
}

float cardFill(vec2 p) {
  return stops(gradientAt(p, uSize, 97.6), vec4(0.0, 0.2943, 1.0, 1.0), vec4(0.11, 0.06, 0.06, 0.06));
}

float cardBorder(vec2 p, float degrees) {
  return stops(gradientAt(p, uSize, degrees), vec4(0.0856, 0.3796, 0.5019, 0.8006), vec4(0.45, 0.0001, 0.0001, 0.15));
}

void main() {
  vec2 p = (vec2(vUv.x, 1.0 - vUv.y) - 0.5) * uSize;
  float d = roundedBox(p, uSize * 0.5, uRadius);
  float shape = coverage(d);
  float ring = max(shape - coverage(d + uBorderWidth), 0.0);

  vec4 body = premultiply(uFill.a < 0.0 ? vec4(1.0, 1.0, 1.0, cardFill(p)) : uFill);
  body.a = mix(body.a, 1.0, uSolid);
  vec4 edge = premultiply(uBorder.a < 0.0 ? vec4(1.0, 1.0, 1.0, cardBorder(p, uBorderAngle)) : uBorder);

  if (uGlass > 0.0) {
    vec3 behind = mix(texture2D(uBackdrop, gl_FragCoord.xy / uResolution).rgb * (1.0 - uDim), SMOKE, SMOKE_ALPHA);
    body = mix(body, vec4(behind, 1.0), uGlass);
    edge = mix(edge, premultiply(vec4(1.0, 1.0, 1.0, cardBorder(p, 134.62))), uGlass);
  }

  vec4 bodyColor = body * shape;
  vec4 edgeColor = edge * ring;

  gl_FragColor = (edgeColor + bodyColor * (1.0 - edgeColor.a)) * uOpacity;
}
