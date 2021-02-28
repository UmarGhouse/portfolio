import React from 'react'

import { Chip } from '@material-ui/core'

import { contrast } from '../Helpers'

export default function SkillChip({skill}) {
  return (
    <Chip size="small" label={skill.name} className="skill-chip" style={{ backgroundColor: skill.colour, color: contrast(skill.colour) }} />
  )
}