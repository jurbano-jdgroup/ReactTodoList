import { useState } from "react"
import { toast } from "react-toastify"
import AddForm from "../components/AddForm"
import Calendar from "../components/Calendar"
import Header from "../components/Header"
import HoursShower from "../components/HoursShower"
import ItemsList from "../components/ItemsList"

const Home = ()=> {
    const [data, setData] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(false)

    const onSubmit = (values)=> {
        console.log("values: ", values)
        setData([...data, values])
        setShowForm(false)
        toast.success("Se agregó el nuevo elemento")
    }

    const onAddClicked = ()=> {
        setShowForm(true)
    }

    return (
        <>
            <Header handleOnAdd={onAddClicked}/>
            <div class="row no-gutters">
                <div class="col-12 col-md-4 p-4 my-3">
                    <Calendar data={data} />
                </div>
                <div class="col-12 col-md-8 p-4 my-3">
                    <HoursShower />
                    <ItemsList data={data} />
                </div>
            </div>
            <AddForm data={{}} editing={editing} showForm={showForm} onSubmit={onSubmit}
            setShowForm={setShowForm} />
        </>
    )
}

export default Home