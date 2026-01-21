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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    application,
    about,
    stats,
    curriculum,
    gallery,
    section,
    missionVission,
    adminMessage,
    contact
  ],
}
