// PaymentTerms.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentTerms } from '../paymentTerms/store';

function PaymentTerms() {
  const dispatch = useDispatch();
  const paymentTerms = useSelector((state) => state.appPaymentTerms.paymentTerms);

  useEffect(() => {
    dispatch(getPaymentTerms());
  }, [dispatch]);

  return (
    <div>
      <h1>Payment Terms</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {paymentTerms.map((term) => (
            <tr key={term._id}>
              <td>{term._id}</td>
              <td>{term.name}</td>
              <td>{term.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTerms;
