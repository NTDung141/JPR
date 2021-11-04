import React, { useState } from 'react';
import "./History.css"

function History() {

    const allResult = JSON.parse(localStorage.getItem("allResult"))
    const [allHistory, setAllHistory] = useState(allResult)
    const [detailItem, setDetailItem] = useState({
        dateTime: new Date(),
        content: [],
    })
    

    const onClickViewDetail = (item) => {
        setDetailItem(item)
    }

    const showHistory = (allResult) => {
        if (allResult) {
            return (
                <>
                    {
                        allResult.map((item, index) => {
                            return (
                                <div onClick={() => onClickViewDetail(item)}
                                        data-bs-whatever={index}
                                        key={index}>
                                    <div className="history-item">
                                        <div className="history-item-date">{new Date(item.dateTime).toLocaleDateString()}</div>

                                        <div className="history-item-time">{new Date(item.dateTime).toLocaleTimeString()}</div>

                                        <div className="history-item-content cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">{item.content.join('').length > 20 ? `${item.content.join(' ').slice(0, 20)}...` : item.content.join('')}</div>

                                        <div className="history-item-action">
                                            <i className="fas fa-times cursor-pointer" onClick={() => deleteHistory(index)}></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Detail</h5>

                                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <div className="flex-start mb-2">{new Date(detailItem.dateTime).toLocaleDateString() + " " + new Date(detailItem.dateTime).toLocaleTimeString()}</div>

                                    <div>
                                        {
                                            detailItem.content.map(item =>
                                                <p>{item}</p>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
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
        <div className="container mb-5 mt-5">
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