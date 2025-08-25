import big from './big'
import burrowing from './burrowing'
import camouflage from './camouflage'
import communication from './communication'
import cooperation from './cooperation'
import fatTissue from './fatTissue'
import hibernation from './hibernation'
import mimicry from './mimicry'
import parasite from './parasite'
import piracy from './piracy'
import poisonous from './poisonous'
import predator from './predator'
import running from './running'
import scavenger from './scavenger'
import sharpVision from './sharpVision'
import swimming from './swimming'
import symbiosis from './symbiosis'
import tailLoss from './tailLoss'
import topotun from './topotun'

export const TRAITS = {
  big,
  burrowing,
  camouflage,
  communication,
  cooperation,
  fatTissue,
  hibernation,
  mimicry,
  parasite,
  piracy,
  poisonous,
  predator,
  running,
  scavenger,
  sharpVision,
  swimming,
  symbiosis,
  tailLoss,
  topotun,
} as const

export type TraitId = keyof typeof TRAITS
export type Trait = (typeof TRAITS)[TraitId]
