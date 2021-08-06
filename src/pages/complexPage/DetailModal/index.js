import React from "react"
import { Modal } from 'antd'
import store from "./store"
import {observer} from "mobx-react-lite"

export default observer(() => {
    const {visible, loading, detail, handleOk, handleCancel} = store
    return (
        <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{loading}}
        >
            <p>{detail.name}</p>
            <p>{detail.age}</p>
            <p>{detail.address}</p>
        </Modal>
    )
})
