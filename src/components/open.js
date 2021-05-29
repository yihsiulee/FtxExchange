import React, { useState } from 'react'
import { InputTextField } from '../styles'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

const Open = () => {
  const [selectedValue, setSelectedValue] = useState('long')
  const [slideValue, setSlideValue] = useState('10')
  const leverageMarks = [
    {
      value: 0,
      label: '0x',
    },
    {
      value: 50,
      label: '50x',
    },
    {
      value: 100,
      label: '100x',
    },
  ]
  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleChangeSlide = (event, newValue) => {
    setSlideValue(newValue)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <span className="text-red-600 text-lg mr-5 font-bold">開倉參數:</span>
      </div>
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">
          <span className="mr-5">多空倉切換:</span>
          <span>{selectedValue}</span>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                row
                defaultValue="long"
                aria-label="多空"
                name="longOrShort"
                value={selectedValue}
                onChange={handleChangeSelect}
              >
                <FormControlLabel value="long" control={<Radio />} label="long" />
                <FormControlLabel value="short" control={<Radio />} label="short" />
              </RadioGroup>
            </FormControl>
          </div>
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">開倉時間:</span>
        <InputTextField label="time" variant="outlined" color="primary" size="small" />
      </div>
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">開倉數量:</span>
        {/* TODO:可填入的格子 */}
        <InputTextField label="Outlined" variant="outlined" size="small" />%
      </div>
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">
          <div className="flex items-center">
            <span className="mr-5">槓桿倍數:</span>
            <Typography id="discrete-slider-custom">{`leverage: ${slideValue}x`}</Typography>
          </div>
          <div>
            <Slider
              style={{ width: 300 }}
              defaultValue={10}
              onChange={handleChangeSlide}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              marks={leverageMarks}
            />
          </div>
        </span>
      </div>
      <div className="flex items-center">
        {/* TODO: 發送交易request給ftx */}
        <Button
          onClick={() => {
            alert('clicked')
          }}
          size="small"
          variant="contained"
          color="primary"
        >
          confirm
        </Button>
      </div>
    </div>
  )
}
export default Open
