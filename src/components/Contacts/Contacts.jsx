import React, {useState, useEffect} from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import {Title, Section, Container, Message} from './Contacts.styled';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export function Contacts(){
    const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
    const [filter, setFilter] = useState('');

    const addContact = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const newContactName = form.elements.name.value;
        const newContactNumber = form.elements.number.value;

        if (contacts.find(item => item.name.toLowerCase() === newContactName.toLowerCase()))
            {
                return Notify.warning(`${newContactName} is alrady in contacts`,
                { timeout: 4000, position: 'center-top', width: '400px', fontSize: '28px' })
        };
        
        const newContact = { id: nanoid(), name: newContactName, number: newContactNumber, };
        setContacts(prew => [...prew, newContact]);
        form.reset();
    }

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
        }, [contacts]
    );
  

    const removeContact = (e) => {
        const deletedContact = e.target.id;
        const newContactList = contacts.filter(contact => contact.id !== deletedContact);
        setContacts(newContactList);
    }

    const findContact = (e) => {
        const serchName = e.target.value;
        setFilter(serchName);
    }

    const filtredList = () => {
        return filter ? contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase())): '';
    }

    return <Container>
        <Section>
            <Title>Phonebook</Title>
            <ContactForm addContact={addContact} />
        </Section>
        <Section>
            <Title>Contacts</Title>
            <Filter findContact={findContact} serchName={filter} />

            {(filter && (filtredList().length !== 0 
            ? <ContactList contacts={filtredList()} removeContact={removeContact} />
            : <Message>Сontact was not found</Message>)) ||
            (contacts.length === 0 ? <Message>You don't have any contact</Message>
            : <ContactList contacts={contacts} removeContact={removeContact}/>)
            }
        </Section>
    </Container>
        
};






// export class Contacts extends Component{
//     state = {
//         contacts: [],
//         filter: '',
//     }

//     addContact = (e) => {
//         e.preventDefault();
//         const form = e.currentTarget;
//         const newContactName = form.elements.name.value;
//         const newContactNumber = form.elements.number.value;
//         const oldContacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];

//         if (oldContacts.find(item => item.name.toLowerCase() === newContactName.toLowerCase()))
//             {
//                 return Notify.warning(`${newContactName} is alrady in contacts`,
//                 { timeout: 4000, position: 'center-top', width: '400px', fontSize: '28px' })
//             };
//         const newContact = { id: nanoid(), name: newContactName, number: newContactNumber, };
//         this.setState({ contacts: [...oldContacts, newContact], });
//         form.reset();
//     }

//     componentDidUpdate(_, prew) {
//         const { contacts } = this.state;
//         if(prew.contacts.length !== contacts.length){
//             localStorage.setItem('contacts', JSON.stringify(contacts));
//         }
//     }

//     componentDidMount() {
//         const oldContacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
//         this.setState({ contacts: oldContacts });
//     }

//     removeContact = (e) => {
//         const { contacts } = this.state;

//         const deletedContact = e.target.id;
//         const newContactList = contacts.filter(contact => contact.id !== deletedContact);
//         this.setState({
//             contacts: newContactList,
//         });
//     }

//     findContact = (e) => {
//         const serchName = e.target.value;
//         this.setState({
//             filter: serchName,
//         });
//     }

//     filtredList = () => {
//         const { contacts, filter } = this.state
//         return filter ? contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase())): '';
        
//     }
    
//     render() {
//         const { contacts, filter } = this.state;

//         return <Container>
//             <Section>
//                 <Title>Phonebook</Title>
//                 <ContactForm addContact={this.addContact} />
//             </Section>
//             <Section>
//                 <Title>Contacts</Title>
//                 <Filter findContact={this.findContact} serchName={filter} />

//                 {(filter && (this.filtredList().length !== 0 
//                 ? <ContactList contacts={this.filtredList()} removeContact={this.removeContact} />
//                 : <Message>Сontact was not found</Message>)) ||
//                 (contacts.length === 0 ? <Message>You don't have any contact</Message>
//                 : <ContactList contacts={contacts} removeContact={this.removeContact}/>)
//                 }
//             </Section>
//         </Container>
        
//     };
// }