import React from 'react'

import { Grid, Typography, Button, ButtonGroup, CircularProgress } from '@material-ui/core'

import StarIcon from '@material-ui/icons/Star'
import DeleteIcon from '@material-ui/icons/Delete'

export default function ScreenshotItem({ screenshot, handleDelete, handleFeatured, loading, selectedScreenshot }) {
  return (
    <Grid item>
      <Grid container direction="column" justify="space-between" alignItems="center" spacing={1}>
        <Grid item xs={12} md={4}>
          <img src={screenshot.url} alt={screenshot.filename} width="100%" />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="caption">{screenshot.filename}</Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <ButtonGroup variant="text">
            <Button>
              {loading && selectedScreenshot.id === screenshot.id ?
                (<CircularProgress />) :
                (<StarIcon onClick={() => { handleFeatured(screenshot) }} style={{ color: `${screenshot.featured ? "blue" : "inherit"}` }} />)}
            </Button>
            <Button><DeleteIcon onClick={() => { handleDelete(screenshot) }} /></Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  )
}