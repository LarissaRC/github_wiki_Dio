import { useState } from 'react';
import gitlogo from '../assets/github.png';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import { api } from '../services/api'

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);

    if(data?.id) {
      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
      } else {
        alert("Repositório já está na lista");
      }
    } else {
      alert("Repositório não encontrado");
    }
  }

  const handleRemoveRepo = (id) => {
    console.log("Removendo registro: " + id);
    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt="Git logo" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={() => handleSearchRepo()}/>
      {repos.map(repo => <ItemRepo
                            key={repo.id}
                            repo={repo}
                            handleRemoveRepo={handleRemoveRepo}
                          />)}
    </Container>
  );
}

export default App;
