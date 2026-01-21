import { type SchemaTypeDefinition } from 'sanity'
import missionVission from './missionVission'
import adminMessage from './adminMessage'
import hero from './hero'
import gallery from './gallery'
import section from './section'
import about from './about'
import curriculum from './curriculum'
import stats from './stats'
import contact from './contact'
import application from './application'
import fees from './fees'
import aboutPage from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    application,
    about,
    aboutPage,
    stats,
    curriculum,
    gallery,
    fees,
    section,
    missionVission,
    adminMessage,
    contact
  ],
}
