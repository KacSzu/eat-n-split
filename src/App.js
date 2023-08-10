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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleSelection(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend?.id ? null : friend
    );
    setShowAddFriend(false);
  }
  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }
  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSplitTheBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          friends={friends}
          onSelection={handleSelection}
        />
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          onSplitBill={handleSplitTheBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function Button({ children, onClick, onSelection }) {
  return (
    <button onSelection={onSelection} onClick={onClick} className="button">
      {children}
    </button>
  );
}
function FriendsList({ selectedFriend, friends, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");
  const id = crypto.randomUUID();
  function handleSubmit(e) {
    if (!name || !image) return;
    e.preventDefault();
    const newFriend = {
      id,
      name,
      image: `${image}${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=");
  }
  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👨‍👦 Your friend name </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your friend name"
        ></input>
        <label>🖼 Image URL</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Friend's image URL"
        ></input>
        <Button>Add</Button>
      </form>
    </>
  );
}

function FormSplitBill({ onSplitBill, selectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState(`user`);

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        placeholder="Type bill value"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      ></input>
      <label>🙎‍♂️ Your expenses</label>
      <input
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
        type="text"
        placeholder="Type your expenses"
        value={paidByUser}
      ></input>
      <label>👨‍👦 {selectedFriend.name}'s expenses</label>
      <input
        type="text"
        placeholder="X's expenses"
        disabled
        value={paidByFriend}
      ></input>
      <label>🤑 Who is paying ?</label>
      <select
        onChange={(e) => setWhoIsPaying(e.target.value)}
        value={whoIsPaying}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
