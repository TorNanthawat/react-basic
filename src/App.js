import Transaction from "./Components/Transaction"
import FormComponent from "./Components/FormComponent"
import { useState, useEffect } from "react"
import "./App.css"
import DataContext from "./data/DataContext"
import ReportComponent from "./Components/ReportComponent"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"

function App() {
    const design = { color: "#4CC9FE", textAlign: "center", fontSize: "1.7rem" }

    // API Data
    useEffect(() => {
        fetch("https://6747ea1538c8741641d81b75.mockapi.io/api/v1/Users")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching data:", error))
    }, [])

    const [items, setItems] = useState([])

    const [reportIncome, setReportIncome] = useState(0)
    const [reportExpense, setReportExpense] = useState(0)
    const onAddNewItem = (newItem) => {
        setItems((prevItem) => {
            return [newItem, ...prevItem]
        })
    }
    useEffect(() => {
        const amounts = items.map((items) => items.amount)
        const income = amounts.filter((element) => element > 0).reduce((total, element) => (total += element), 0)
        const expense = amounts.filter((element) => element < 0).reduce((total, element) => (total += element), 0) * -1

        setReportIncome(income.toFixed(2))
        setReportExpense(expense.toFixed(2))
    }, [items, reportIncome, reportExpense])

    return (
        <DataContext.Provider value={{ income: reportIncome, expense: reportExpense }}>
            <div className="container">
                <h1 style={design}>แอปบัญชีรายรับ - รายจ่าย</h1>
                <Router>
                    <div>
                        <ul className="horizontal-menu">
                            <li>
                                <Link to="/">ข้อมูลบัญชี</Link>
                            </li>
                            <li>
                                <Link to="/insert">บันทึกข้อมูล</Link>
                            </li>
                        </ul>
                        <Routes>
                            <Route path="/" element={<ReportComponent />}></Route>
                            <Route
                                path="/insert"
                                element={
                                    <>
                                        <FormComponent onAddItem={onAddNewItem} />
                                        <Transaction items={items} />
                                    </>
                                }
                            ></Route>
                        </Routes>
                    </div>
                </Router>
            </div>
            <footer>
                <div>© 2024 Created by TorDev</div>
            </footer>
        </DataContext.Provider>
    )
}

export default App
