import Item from "./Item"
import "./Transaction.css"

const Transaction = (props) => {
    const { items } = props
    return (
        <div>
            <ul className="item-list">
                {items.map((item) => (
                    <Item {...item} key={item.id} />
                ))}
            </ul>
        </div>
    )
}

export default Transaction
