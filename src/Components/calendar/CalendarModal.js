import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minute(0).seconds(0).add(1, 'hours'); // 12:00
const nowPlus1 = now.clone().add(1, 'hours');

export const CalendarModal = () => {

  const [dateStart, setDateStart] = useState( now.toDate() );
  const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
  const [titleValid, settitleValid] = useState(true)

  const [formValues, setFormValues] = useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
  });

  const { notes, title, start, end } = formValues;

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    console.log("closing...");
  };
  
  const handleStartDateChange = (e) => {
    setDateStart( e )
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e)
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment( start );
    const momentEnd = moment( end );

    if( momentStart.isSameOrAfter( momentEnd) ) {
      console.log('Fecha momentEnd debe ser mayor que momentStart');
      Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
      return false;
    }

    if( title.trim().length < 2 ){
      return settitleValid(false);
    }

    // TODO: realizar grabacion 
    settitleValid(true);
    closeModal();
  }

  return (
    <Modal
      isOpen={true} // boolean, mostar el modal
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal} // cerrar el modal
      closeTimeoutMS={200} // Tiempo a cerrar
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo" // clase de fondo del modal
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form 
        className="container"
        onSubmit={ handleSubmitForm }
      >
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={ handleStartDateChange }
            value={ dateStart }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={ handleEndDateChange }
            value={ dateEnd }
            minDate={ dateStart } // fecha minima para que la de inicio no sea mayor
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ !titleValid && 'is-invalid' } `}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ handleInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};