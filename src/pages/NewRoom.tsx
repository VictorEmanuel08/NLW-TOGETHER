import { FormEvent, useState } from 'react';
import {Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg' //importando através de uma variável, dps passamos ela como src
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'

export function NewRoom(){
  const {user} = useAuth();
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) { //a função só será chamada após o submit do form
    event.preventDefault();

    if(newRoom.trim()===''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
    window.location.reload();
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audieñcia em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk"/>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event=>setNewRoom(event.target.value)} //toda vez que o usuário digita algo no input, eu pego o evento e atualizo valor
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}