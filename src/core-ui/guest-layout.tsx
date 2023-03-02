// Internal
import './guest.min.css';

export const GuestLayout = ({ children } : any) => {
    return (
        <div id="guest-wrapper">
            <div id="contents">
                { children }
            </div>
        </div>
    )
}