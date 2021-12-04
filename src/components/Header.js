import { useState } from "react"
import { BarsIcon, MainIconPrimary } from "../assets/icons"
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const Header = ({handleOnAdd}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onAddClicked = ()=> {
        setAnchorEl(null)
        handleOnAdd()
    }

    return (
        <div className="p-3 border-bottom d-flex flex-row align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <MainIconPrimary />
                <div className="mx-3">
                    <h5 className="py-0 my-0">
                        <strong>
                            todolist
                        </strong>
                    </h5>
                    <small className="text-secondary">
                        jurbano@jdevelopgroup.com
                    </small>
                </div>
            </div>
            <div>
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <BarsIcon width="32" height="32" />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={onAddClicked}>Add</MenuItem>
                    <MenuItem >Import</MenuItem>
                    <MenuItem>Export</MenuItem>
                    <MenuItem>About</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Header