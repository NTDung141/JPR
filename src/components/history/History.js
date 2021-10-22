import React, { useState } from 'react';
import "./History.css"

function History() {

    const allResult = JSON.parse(localStorage.getItem("allResult"))
    const [allHistory, setAllHistory] = useState(allResult)

    const showHistory = (allResult) => {
        if (allResult) {
            return allResult.map((item, index) => {
                return (
                    <div>
                        <div className="history-item">
                            <div className="history-item-date">{new Date(item.dateTime).toLocaleDateString()}</div>

                            <div className="history-item-time">{new Date(item.dateTime).toLocaleTimeString()}</div>

                            <div className="history-item-content" data-toggle="modal" data-target="#exampleModalCenter">{item.content}</div>

                            <div className="history-item-action">
                                <i className="fas fa-times" onClick={() => deleteHistory(index)}></i>
                            </div>
                        </div>

                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Detail</h5>

                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="flex-start mb-2">{new Date(item.dateTime).toLocaleDateString() + " " + new Date(item.dateTime).toLocaleTimeString()}</div>

                                        <div className="flex-start">{item.content}</div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    const deleteHistory = (index) => {
        let newAllResult = [...allResult]
        newAllResult.splice(index, 1)
        setAllHistory(newAllResult)
        localStorage.setItem("allResult", JSON.stringify(newAllResult))
    }

    const deleteAllHistory = () => {
        let newAllResult = []
        setAllHistory(newAllResult)
        localStorage.setItem("allResult", JSON.stringify(newAllResult))
    }

    return (
        <div className="history-page">
            {(allResult && allResult.length > 0)
                ?
                <div className="history-page-action">
                    <button type="button" className="btn btn-danger" onClick={() => deleteAllHistory()}>
                        <i className="fas fa-trash mr-2"></i>
                        Clear all
                    </button>
                </div>
                :
                <div>
                    <h3>No result</h3>
                </div>
            }

            <div className="history-list">
                {showHistory(allHistory)}
            </div>
        </div>
    );
}

export default History;