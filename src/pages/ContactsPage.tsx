import React from "react";
import { mockContacts } from "../features/contacts/contactsData";

export const ContactsPage: React.FC = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-white mb-6'>Your Contacts</h1>

      {/* Mobile View: Card List */}
      <div className='grid gap-4 md:hidden'>
        {mockContacts.map((contact) => (
          <div
            key={contact.id}
            className='bg-white/5 border border-white/10 rounded-lg p-4 space-y-2'
          >
            <div className='flex justify-between items-center'>
              <span className='font-bold text-white'>{contact.name}</span>
              <span className='text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full'>
                {contact.type}
              </span>
            </div>
            <div className='text-sm text-white/80'>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className='hidden md:block bg-white/5 border border-white/10 rounded-xl'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-white/80'>
            <thead className='text-xs text-white uppercase bg-white/10'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Type
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className='border-b border-white/10 hover:bg-white/5'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-white whitespace-nowrap'
                  >
                    {contact.name}
                  </th>
                  <td className='px-6 py-4'>{contact.type}</td>
                  <td className='px-6 py-4'>{contact.email}</td>
                  <td className='px-6 py-4'>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
