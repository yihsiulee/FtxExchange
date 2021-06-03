import React from 'react'
import Button from '@material-ui/core/Button'
import { InputTextField } from '../styles'
import InputAdornment from '@material-ui/core/InputAdornment'

const Close = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="text-red-600 text-lg mr-5 font-bold">止盈/止損參數:</span>
      </div>
      {/* <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">平倉時間:</span>
        <InputTextField label="平倉時間" variant="outlined" color="primary" size="small" />
      </div> */}
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">止損%數:</span>
        <InputTextField
          label="止損%數"
          variant="outlined"
          color="primary"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </div>
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">追蹤止盈%數:</span>
        <InputTextField
          label="目標%數"
          variant="outlined"
          color="primary"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <InputTextField
          label="追蹤%數"
          variant="outlined"
          color="primary"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </div>
      <div className="flex items-center">
        <Button
          onClick={() => {
            alert('comfirm 平倉參數')
          }}
          size="small"
          variant="contained"
          color="primary"
        >
          confirm
        </Button>

      </div>

      <div className="flex items-center">
        <span className="text-red-600 text-lg mr-5 font-bold">平倉參數:</span>
      </div>

      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">手動平倉%數:</span>
          <InputTextField
            label="平倉%數"
            variant="outlined"
            color="primary"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
      </div>
          <div className="flex items-center">
            <Button
              onClick={() => {
                alert('comfirm 平倉參數')
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
export default Close
