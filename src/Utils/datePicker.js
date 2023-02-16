import * as React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { fr } from 'date-fns/locale'
import DateFnsUtils from '@date-io/date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export const BasicDateTimePicker = (props) => {
    const [value, setValue] = React.useState(dayjs(new Date()))

    return (
        <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                    props.setMeetingDate(newValue)
                }}
                locale={fr}
                utils={DateFnsUtils}
            />
        </LocalizationProvider>
    )
}
