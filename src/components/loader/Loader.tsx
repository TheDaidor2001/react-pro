import './loader.css'

export const Loader = (): JSX.Element => {
    return (
        <div className='loader-container'>
            <div data-test-id="loader" className="loader"></div>
        </div>
    )
}
