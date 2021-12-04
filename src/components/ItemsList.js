import moment from "moment"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "../assets/icons"
import Loader from "./Loader"

const ItemsList = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const [orderSelected, setOrderSelected] = useState('date')
    const [itemsGroups, setItemsGroups] = useState([])

    useEffect(() => {
        setLoading(true)

        const tmpObject = {}
        data.forEach(item => {
            item.dates.forEach(date=> {
                const mom = moment(new Date(date.time))
                const dateFormat = mom.format("YYYY/MM/DD")

                if (!tmpObject[dateFormat]) 
                    tmpObject[dateFormat] = {
                        show: false,
                        time: dateFormat,
                        items: []
                    }

                tmpObject[dateFormat].items.push({
                    time: date.time,
                    name: item.name,
                    subject: item.subject,
                    description: date.description
                })
            })
        })

        const keys = Object.keys(tmpObject)
        keys.sort((a, b)=> {
            return moment(b, "YYYY/MM/DD").isBefore(moment(a, "YYYY/MM/DD"))
        })

        setItemsGroups(keys.map(item=>tmpObject[item]))
        setLoading(false)
    }, [data, orderSelected])

    const groupHeaderClicked = (group) => {
        group.show = !group.show
        setItemsGroups([...itemsGroups])
    }

    return (
        <div className="mt-4">
            <div>
                <div>
                    <small className="text-secondary">
                        ORDER
                    </small>
                </div>
                <div className="mt-2">
                    {
                        ['name', 'subject', 'date'].map(item => (
                            <span className="me-4" key={item} 
                            onClick={()=> setOrderSelected(item)}
                            style={
                                {
                                    ...{
                                        color: 'rgb(200,201,202)',
                                        cursor: 'pointer'
                                    },
                                    ...orderSelected === item ? {
                                        color: 'black',
                                        fontWeight: 'bold',
                                        borderBottom: '1px solid'
                                    } : {}
                                }
                            }>
                                <small>
                                    {item}
                                </small>
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="mt-4">
                {loading? <Loader className="d-flex justify-content-center mt-5" />:
                    itemsGroups.map(group => (
                        <div key={group.time} className="my-3 py-2 border-bottom">
                            <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}
                                onClick={() => groupHeaderClicked(group)}>
                                {
                                    group.show ? <ChevronUp /> : <ChevronDown />
                                }
                                <span className="mx-4">
                                    {moment(group.time, 'YYYY/MM/DD').format('ddd D, MMM')}
                                </span>
                                <span className="bg-light rounded d-inline-block px-2 text-muted">
                                    <small>
                                        {group.items.length}
                                    </small>
                                </span>
                            </div>
                            {/* content */}
                            <div className={group.show?'d-block':'d-none'}>
                                {
                                    group.items.map((item, idx) => (
                                        <div className="custom-box custom-shadow my-4 bg-white todo-item"
                                            key={`item-key-${idx}`}>
                                            <small style={{ color: 'rgb(150,151,152)' }}>
                                                {moment(item.time).format('h:mm a')}
                                            </small>
                                            <div>
                                                <strong>
                                                    {item.name}
                                                </strong>
                                            </div>
                                            <div className="my-1">
                                                <small>
                                                    <strong>
                                                        {item.subject}
                                                    </strong>
                                                </small>
                                            </div>
                                            <div style={{ color: 'rgb(150,151,152)' }}>
                                                <small>
                                                    {item.description}
                                                </small>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ItemsList