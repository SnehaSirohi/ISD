import React from 'react'
const Sidebar = () => {
    let [sem, setsem] = React.useState(false);
    function showsemesterhandler() {
        if (sem == false) {
            setsem(true);
        }
        else {
            setsem(false);
        }
    }
    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#fffff" }}>
            <ul class="nav flex-column sticky-top pl-0 pt-3  mt-3 sidebar">
                <li class="nav-item "><a class="nav-link text-secondary" href="#"><i class='fas fa-home font-weight-bold ml-2'></i><span className="ml-3">Dashboard</span></a></li>
                <li class="nav-item "><a class="nav-link text-secondary" href="#"><i class="fas fa-edit font-weight-bold ml-2"></i><span className="ml-3" onClick={showsemesterhandler}>Semesters</span><i class="fas fa-angle-down font-weight-bold ml-1" onClick={showsemesterhandler}></i></a></li>
                <li class="nav-item semestercontent" style={{
                    display: sem ? "block" : "none"
                }}>
                    <div name="semester" id="semester">
                        <h6>1st</h6>
                        <h6>2nd</h6>
                        <h6>3rd</h6>
                        <h6>4th</h6>
                    </div>
                </li>
                <li class="nav-item"><a class="nav-link text-secondary" href="#"><i class="fa fa-cog ml-2"></i><span className="ml-3">Setting</span></a></li>
                <li class="nav-item"><a class="nav-link text-secondary" href="#"><i class="fas fa-atom font-weight-bold ml-2"></i> <span className="ml-3">FAQ</span></a></li>
                <li class="nav-item"><a class="nav-link text-secondary" href="#"><i class="fas fa-atom font-weight-bold ml-2"></i> <span className="ml-3">Logout</span></a></li>
            </ul>
        </div>
    )
}

export default Sidebar