import React from 'react'

function Dashboardcontent() {
    return (
        <div class="col main pt-5  dashboardbackground">
            <div class="row mb-3 dashblocks">
                <div class="col-xl-3 col-sm-6 blockcolour">
                    <div>
                        <h5 class="text-uppercase">CLASS SCHEDULED</h5>
                        <h1 class="display-4">2</h1>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 blockcolour">
                    <div>
                        <h5 class="text-uppercase">TEST SCHEDULED</h5>
                        <h1 class="display-4">1</h1>
                    </div>

                </div>
                <div class="col-xl-3 col-sm-6 blockcolour">
                    <div>
                        <h5 class="text-uppercase">ASSIGNMENT PENDING</h5>
                        <h1 class="display-4">4</h1>
                    </div>
                </div>
            </div>

            <div class="row overviewdatacontent">
                <div class="col-lg-7 col-md-6 col-sm-12 datacontent flex">
                    <div class="classinfo">
                        <h5>Total classes</h5>
                        <h5>Total Tests</h5>
                        <h5>Assignment submitted</h5>
                        <h5>Attendence %</h5>
                    </div>
                    <div class="classinfoval">
                        <h5>84</h5>
                        <h5>12</h5>
                        <h5>18</h5>
                        <h5>58</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboardcontent