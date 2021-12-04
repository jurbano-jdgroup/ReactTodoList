import { useEffect, useState } from "react"
import moment from "moment-timezone"
import { ChevronLeft, ChevronRight } from "../assets/icons"
import { toast } from "react-toastify"

const WEEK_DAYS_MIN = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

const Calendar = ({ data=[] }) => {
    const [dateToShow, setDateToShow] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dateArray, setDateArray] = useState(null)

    useEffect(() => {
        updateDateArray()
    }, [dateToShow, data])

    const updateDateArray = () => {
        const dataItemsArray = {}
        try{
            data.forEach((item) => {
                item.dates.forEach((subItem)=> {
                    const time = subItem.time
                    const dateItem = new Date(time)
                    const dateString = moment(dateItem).format("YYYY-MM-DD")

                    if (dataItemsArray[dateString]) {
                        dataItemsArray[dateString] = dataItemsArray[dateString] + 1
                    } else {
                        dataItemsArray[dateString] = 1
                    }
                })
            })
        }catch(err) {
            toast.error("Ocurrió un error actualizando el calendario")
            console.log("error: ", err)
        }

        const curDate = new Date()
        curDate.setHours(0, 0, 0, 0)
        var dShow = new Date()

        if (dateToShow) dShow.setTime(dateToShow.getTime())
        dShow.setHours(0, 0, 0, 0)

        dShow.setDate(1)

        let curDW = 0, laDW = 0, dMonth = dShow.getMonth(), wInd = 0, dArray = []
        while (dShow.getMonth() === dMonth) {
            laDW = curDW
            curDW = dShow.getDay()

            if (curDW === 0 && laDW === 6) wInd++

            if (!dArray[wInd]) dArray[wInd] = []

            const dateString = moment(dShow).format("YYYY-MM-DD")
            var len = 0

            if (dataItemsArray[dateString]) len = dataItemsArray[dateString]

            dArray[wInd][curDW] = {
                date: dShow.getDate(),
                current: dShow.getTime()===curDate.getTime(),
                len: len
            }

            dShow.setDate(dShow.getDate() + 1)
        }

        setDateArray(dArray)
    }

    const decreaseMonth = ()=> {
        const nDate = new Date(dateToShow.getTime())
        nDate.setMonth(nDate.getMonth()-1)
        setDateToShow(nDate)
    }

    const increaseMonth = ()=> {
        const nDate = new Date(dateToShow.getTime())
        nDate.setMonth(nDate.getMonth()+1)
        setDateToShow(nDate)
    }

    const fillCircles = (len) => {
        return Array((len>3?3:len)).fill(1).map((item, idx) => (
            <span key={`circle-${item}-${idx}`} style={
                {
                    display:'inline-block',
                    width:'3px',
                    height:'3px',
                    boxSizing:'border-box',
                    borderRadius:'3px',
                    backgroundColor:'blue',
                    margin:'0px 2px'
                }
            }>
            </span>
        ))
    }

    return (
        <div className="custom-shadow custom-box bg-white">
            <div className="text-center">
                <small>
                    {moment(dateToShow).format('YYYY')}
                </small>
            </div>  
            <div className="d-flex align-items-center justify-content-between">
                <ChevronLeft onClick={decreaseMonth} style={{cursor:'pointer'}} />
                {moment(dateToShow).format('MMMM')}
                <ChevronRight onClick={increaseMonth} style={{cursor:'pointer'}} />
            </div>
            <div className="mt-3">
                <table style={
                    {
                        width: '100%',
                        tableLayout: 'fixed'
                    }
                }>
                    <thead>
                        <tr>
                            {
                                WEEK_DAYS_MIN.map((item, idx) => (
                                    <th style={{ textAlign: 'center', fontWeight: 'normal' }} key={`th-${item}-${idx}`}>
                                        {item}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dateArray != null ?
                                <>
                                    {
                                        dateArray.map((week, idx2) => (
                                            <tr key={`week-${idx2}`}>
                                                {
                                                    [0,1,2,3,4,5,6].map(idx=> {
                                                        if (week[idx])
                                                            return (
                                                                <td key={`td-idx-${idx}`}>
                                                                    <div className={`calendar-td-div ${week[idx].current?'current':''}`} >
                                                                        <small>
                                                                            {week[idx].date}
                                                                        </small>
                                                                        {
                                                                            week[idx].len>0?
                                                                            <div>
                                                                                {fillCircles(week[idx].len)}
                                                                            </div>: null
                                                                        }
                                                                    </div>
                                                                </td>
                                                            )
                                                        else
                                                            return (
                                                                <td key={`${idx2}-${idx}`}></td>
                                                            )
                                                    })
                                                }
                                            </tr>
                                        ))
                                    }
                                </>
                                : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar