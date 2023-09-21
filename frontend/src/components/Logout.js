

export default function Logout() {



    const handleLogout = async () => {
        const response = await fetch('/api/logout');
        if (response.ok) {
            const results = await response.json();
            console.log("Logout successful");
            window.location.href = '/';
            
        } else {
            console.error('Logout URL request failed');
        }
    }
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );


}