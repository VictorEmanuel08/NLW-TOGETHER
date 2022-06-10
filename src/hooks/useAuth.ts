import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'

export function useAuth() {
  const value = useContext(AuthContext)

  return value;
}

//toda função que começa com use são hooks, que são funções usadas apenas no escopo do componente
//nesse caso, o hooks pega dados do contexto AuthContext e retorna os dados