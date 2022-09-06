import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import illustrationImg from "../assets/images/illustration.svg" //importando através de uma variável, dps passamos ela como src
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import toast, { Toaster } from 'react-hot-toast';

export function Home(){
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){

    //se usuário nao estiver autenticado, chamar a função sighinWithGoogle
    if(!user){
      await signInWithGoogle() //o que está abaixo do await só será executado se essa função funcionar
    }
    
    //se já estiver autenticado, só redirecionar
    history.push('/rooms/new');
    window.location.reload();
  }

  async function handleJoinRoom(event:FormEvent) {
    event.preventDefault();
    
    if(roomCode.trim()===''){ //se roomCode.trim é vazio, nada será executado
      return;
    }
    
    const roomRef = await database.ref(`rooms/${roomCode}`).get(); //busca todos os dados dessa sala
    
    if(!roomRef.exists()){ //se roomRef retorna falso, retorna um erro
      //https://react-hot-toast.com/ link do toast
      toast.error("Sala não existente.");
      return;
    }

    if(!roomRef.val().endedAt){
      toast.error("Sala está fechada.");
      return;
    }
    
    history.push(`/rooms/${roomCode}`);
    window.location.reload();
  }  
  
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk"/>
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt="Logo do Google"/> 
            Crie sua sala com o Google
          </button>
          
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value = {roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
            <Toaster
              position="top-center"
              reverseOrder={true}
            />
          </form>
        </div>
      </main>
    </div>
  );
}