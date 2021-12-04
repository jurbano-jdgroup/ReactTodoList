const Loader = (props) => {
    return (
        <div {...props}>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader