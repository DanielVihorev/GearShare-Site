import React from "react";
import { mockContacts } from "../features/contacts/contactsData";

export const ContactsPage: React.FC = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>Your Contacts</h1>

      {/* Mobile View: Card List */}
      <div className='grid gap-4 md:hidden'>
        {mockContacts.map((contact) => (
          <div
            key={contact.id}
            className='bg-white border border-gray-200 rounded-lg p-4 space-y-2 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex justify-between items-center'>
              <span className='font-bold text-gray-900'>{contact.name}</span>
              <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                {contact.type}
              </span>
            </div>
            <div className='text-sm text-gray-600'>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className='hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-700'>
            <thead className='text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200'>
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
                  className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                  >
                    {contact.name}
                  </th>
                  <td className='px-6 py-4 text-gray-700'>{contact.type}</td>
                  <td className='px-6 py-4 text-gray-700'>{contact.email}</td>
                  <td className='px-6 py-4 text-gray-700'>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
