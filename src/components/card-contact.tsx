import {FC} from 'react'

import {Config, Contact} from '@/config'
import {EntryContact} from '@/db'

import {LinkExternal} from './link-external'

const contacts = Config.contacts

const DotDivider = () => (
  <div className="w-1 h-1 rounded-[50px] bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.48)_100%)] shadow-[inset_0_0.5px_0_0_#FFFFFF] mx-3" />
)

const ContactLink = ({type, url}: Contact) => (
  <LinkExternal url={url}>
    <h3 className="text-[14px] font-normal tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
      {type}
    </h3>
  </LinkExternal>
)

export const CardContact: FC<EntryContact> = ({area}) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card-border-gradient"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-col w-full grow overflow-hidden h-full items-center justify-center relative">
      <div className="flex flex-row">
        {contacts.map((contact, index) => (
          <div key={contact.type} className="flex flex-row items-center justify-center">
            <ContactLink {...contact} />
            {contacts.length - 1 > index && <DotDivider />}
          </div>
        ))}
      </div>
      <div className="absolute bottom-8">
        <span className="text-[14px] opacity-70 font-normal leading-[100%] tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
          Contact
        </span>
      </div>
    </div>
  </div>
)
