import moment from "moment"
import { useEffect, useState } from "react"

const timeFormat = "HH:mm"

const HoursShower = ()=> {
    const [timeArray, setTimeArray] = useState([])
    const [timestamp, setTimestamp] = useState((new Date()).getTime())

    useEffect(()=> {
        const now = moment()
        const nTimeArray = []
    
        for (let i=-4; i<5; ++i) {
            nTimeArray.push(now.clone().subtract(i, "minutes"))
        }

        setTimeArray(nTimeArray)
    }, [timestamp])

    const timeArrayContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // 2.17 4.35 8.7 17.4 34.8 17.4 8.7 4.35 2.17,
        padding: '4px 0px',
        borderRadius: '4px'
    }

    const itemWidthMap = ['20%', '15%', '12%', '8%', '5%']

    return (
        <div>
            <div className="d-flex flex-row-reverse text-secondary">
                {moment().format("dddd, DD of MMMM, YYYY")}
            </div>
        </div>
    )
}

export default HoursShower