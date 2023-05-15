import './Unauthorized.css'

export function Unauthorized(){
    return(
        <div className="Unauthorized">
            <h1><h1 className='fbColor'>403: Forbidden</h1><br/>You are unauthorized to view this data<br/>Only admin users are allowed to view this content</h1>
            
        </div>
    )
}