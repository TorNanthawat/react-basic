import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import "./FormComponent.css"

const FormComponent = (props) => {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [formValid, setFormValid] = useState(false)

    const inputTitle = (event) => {
        setTitle(event.target.value) //บันทึก Title
    }
    const inputAmount = (event) => {
        setAmount(event.target.value) //บันทึก Amount
    }
    const saveItem = (event) => {
        event.preventDefault()
        const itemData = {
            //สร้างตัวแปรมารับข้อมูลหลังกด Save
            id: uuidv4(),
            title: title,
            amount: Number(amount),
        }
        // เรียกใช้งานฟังก์ชัน onAddItem เพื่อส่งข้อมูลไป App Component
        props.onAddItem(itemData)

        //set ค่าเริ่มต้นใหม่เพื่อรอข้อมูลต่อไป
        setTitle("")
        setAmount(0)
    }

    useEffect(() => {
        const checkData = title.trim().length > 0 && amount !== 0
        setFormValid(checkData)
    }, [title, amount])
    return (
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการ" onChange={inputTitle} value={title}></input>
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input
                        type="number"
                        placeholder="(+ รายรับ , - รายจ่าย)"
                        onChange={inputAmount}
                        value={amount}
                    ></input>
                </div>
                <div>
                    <button className="btn-add" type="submit" disabled={!formValid}>
                        เพิ่มข้อมูล
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent
