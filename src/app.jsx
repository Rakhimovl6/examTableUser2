import './app.css'

import img1 from './assets/Avatar.png'
import { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';


export default function App() {
  return <>
    <TableUser />
  </>
}


function TableUser() {
  const [users, setUsers] = useState([
    {
      img: img1,
      name: 'user1',
      email: 'example@gmail.com',
      city: 'Dushanbe',
      status: "true",
      phone: 123456789,
      id: 1
    },
    {
      img: img1,
      name: 'user2',
      email: 'example@gmail.com',
      city: 'Dushanbe',
      status: "false",
      phone: 123456789,
      id: 2
    },
    {
      img: img1,
      name: 'user3',
      email: 'example@gmail.com',
      city: 'Kulob',
      status: 'true',
      phone: 123456789,
      id: 3
    },
  ])

  const [editModal, setEditModal] = useState(false);
  const [editName, seteditName] = useState('');
  const [editEmail, seteditEmail] = useState('');
  const [editCity, seteditCity] = useState('');
  const [editPhone, seteditPhone] = useState('');
  const [idx, setIdx] = useState(null);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [filter2, setFilter2] = useState('')
  const [theme, setTheme] = useState('light')
  const [addModal, setAddModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const [infoUser, setInfoUser] = useState(null)

    function handleAdd() {
    setAddModal(true)

  }
  function handleAddUser(e) {
    e.preventDefault()
    let newUser = {
      img: img1,
      name: e.target.name.value,
      email: e.target.email.value,
      city: e.target.city.value,
      phone: e.target.phone.value,
      id: Date.now(),
      status: false
    }
    addUser(newUser)
  }
  function addUser(newUser) {
    setUsers([...users, newUser])
    setAddModal(false)
  }


  function handleEdit(user) {
    setEditModal(true);
    seteditName(user.name);
    seteditEmail(user.email);
    seteditCity(user.city);
    seteditPhone(user.phone);
    setIdx(user.id);
  }


  function handleSave(e) {
    e.preventDefault();
    setUsers(users.map(user => {
      if (user.id == idx) {
        user.name = editName;
        user.email = editEmail;
        user.city = editCity;
        user.phone = editPhone;
      }
      return user;
    }));
    seteditName('');
    seteditEmail('');
    seteditCity('');
    seteditPhone('');
    setIdx(null);
    setEditModal(false);
  }


  function handleDelete(id) {
    setUsers(users.filter((user) => user.id != id))
  }
    function handleInfo(user) {
    setInfoModal(!infoModal)
    setInfoUser(user)
  }

  return <>
  <div className={ theme == 'dark' ? 'dark' : 'light'}>
    <div className="bolo" style={{ padding: '10px 100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="ch1">
        <h1>User List 2</h1>
      </div>
      <div className="ch2">
        <button style={{ padding: '10px 30px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', marginRight: '40px', border: 'none' }} onClick={handleAdd}>Add</button>
        <button style={{ padding: '10px 30px' }} onClick={() => setTheme('light')}>Light</button>
        <button style={{ padding: '10px 30px', backgroundColor: 'white' }} onClick={() => setTheme('dark')} >Dark</button>
      </div>
    </div>

    <div className="bolo2" style={{ padding: '20px 100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="bolo2ch1" style={{ display: 'flex', gap: '50px' }}>
        <select id="" style={{ padding: '10px 50px' }} value={filter} onChange={(e) => setFilter(e.target.value)} >
          <option value="">All Status</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <select name="" id="" style={{ padding: '10px 40px' }} value={filter2} onChange={(e) => setFilter2(e.target.value)}  >
          <option value="">All City</option>
          <option value="Kulob">Kulob</option>
          <option value="Dushanbe">Dushanbe</option>

        </select>
      </div>
      <div className="bolo2ch2">
        <input type="search" placeholder="Search..." style={{ padding: '10px 30px' }} onChange={(e) => setSearch(e.target.value)} />

      </div>
    </div>
    <table style={{ width: '80%', margin: 'auto', padding: '20px', border: '1px solid rgb(245, 240, 240)' }}>
      <thead>
        <tr style={{ border: '1px solid ' }}>
          <th>Logo</th>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>status</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users
         .filter(user => filter == '' || user.status.toString() == filter)
          .filter(user => filter2 == '' || user.city.toString() == filter2)
          .filter(user => user.name.toLowerCase().includes(search))


          .map((user) => {
            return <tr key={user.id}>
              <td style={{ paddingTop: '20px' }}><img src={user.img} alt="" /></td>
              <td><p>{user.name}</p></td>
              <td><p>{user.email}</p></td>
              <td><p>{user.city}</p></td>
              <td><p>{user.status}</p></td>
              <td><p>{user.phone}</p></td>
              <td>
                <div className="flex">
                  <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info" onClick={() => handleInfo(user)} />
                  <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => handleEdit(user)} />
                  <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(user.id)} />
                </div>
              </td>
            </tr>
          })}
      </tbody>
    </table>
   </div>


    {editModal &&
      <Dialog header="Edit Userr" visible={editModal} style={{ width: '300px' }} onHide={() => setEditModal(false)}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-3 p-3">
          <span className="p-float-label" style={{ paddingBottom: '10px' }}>
            <InputText value={editName} onChange={(e) => seteditName(e.target.value)} />
          </span>
          <span className="p-float-label" style={{ paddingBottom: '10px' }}>
            <InputText value={editEmail} onChange={(e) => seteditEmail(e.target.value)} />
          </span>
          <span className="p-float-label" style={{ paddingBottom: '10px' }}>
            <InputText value={editCity} onChange={(e) => seteditCity(e.target.value)} />
          </span>
          <span className="p-float-label" style={{ paddingBottom: '10px' }}>
            <InputText value={editPhone} onChange={(e) => seteditPhone(e.target.value)} />
          </span>
          <div  style={{ paddingTop: '20px' }} >
            <Button icon="pi pi-times" className="p-button-text" onClick={() => setEditModal(false)} />
            <Button icon="pi pi-check" type="submit" autoFocus />
          </div>
        </form>
      </Dialog>

    }

    {addModal && (
    <Dialog header="Add User" visible={addModal} style={{ width: '300px' }} onHide={() => setAddModal(false)}>
    <form  onSubmit={handleAddUser} >
      <InputText placeholder="Name" name='name' style={{marginBottom:'10px'}} required />
      <InputText placeholder="Email" name='email' style={{marginBottom:'10px'}}  required />
      <InputText placeholder="City" name='city' style={{marginBottom:'10px'}}  required />
      <InputText placeholder="Phone" name='phone'  resource='' />
      <div style={{ paddingTop: '20px' }}>
        <Button icon="pi pi-times" className="p-button-text" onClick={() => setAddModal(false)} />
        <Button icon="pi pi-check" type="submit"  />
      </div>
    </form>
  </Dialog>
)}

  {infoModal && 
  <Sidebar visible={infoModal} position="right" onHide={() => setInfoModal(false)} style={{ width: '300px' }} showCloseIcon
>
  {infoUser && (
    <div className='info'>
      <Avatar image={infoUser.img} size="xlarge" shape="circle" style={{marginBottom:'40px',width:'200px',height:'200px'}} />
      <div><strong>Name:</strong> {infoUser.name}</div>
      <div><strong>Email:</strong> {infoUser.email}</div>
      <div><strong>City:</strong> {infoUser.city}</div>
      <div><strong>Status:</strong>{' '}
        <Tag
          value={infoUser.status == 'true' ? 'Active' : 'Inactive'}
          severity={infoUser.status == 'true'? 'success' : 'danger'}
        />
      </div>
      <div><strong>Phone:</strong> {infoUser.phone}</div>
    </div>
  )}
</Sidebar>

  }


  </>


}