import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend && <AddFriendForm />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>

      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : ""
        }
      >
        {friend.balance === 0
          ? `You and ${friend.name} are even `
          : friend.balance < 0
          ? `You owe ${friend.name} ${Math.abs(friend.balance)}€`
          : friend.balance > 0
          ? `${friend.name} owes you ${friend.balance}€`
          : null}
      </p>

      <Button>Select</Button>
    </li>
  );
}

function AddFriendForm() {
  return (
    <>
      <form className="form-add-friend">
        <label>👨‍👦 Friend name </label>
        <input type="text" placeholder="Your friend name"></input>
        <label>🖼 Image URL</label>
        <input type="text" placeholder="Friend's image URL"></input>
        <Button>Add</Button>
      </form>
    </>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💰 Bill value</label>
      <input type="text" placeholder="Type bill value"></input>
      <label>🙎‍♂️ Your expenses</label>
      <input type="text" placeholder="Type your expenses"></input>
      <label>👨‍👦 X's expenses</label>
      <input type="text" placeholder="X's expenses" disabled></input>
      <label>🤑 Who is paying ?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
