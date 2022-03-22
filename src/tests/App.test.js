import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { NotFound } from '../components';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
};

describe('Teste o componente <App.js />', () => {
  it('1- Se o topo da aplicação contém um conjunto de links de navegação.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('2- Se a aplicação redireciona à página inicial.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const textElement = screen.getByText('Encountered pokémons');
    expect(textElement).toBeInTheDocument();
  });

  it('3- Se a aplicação redireciona à página de About.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const textElement = screen.getByText('About Pokédex');
    expect(textElement).toBeInTheDocument();
  });

  it('4- Se a aplicação redireciona à página Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemons);
    const textElement = screen.getByText('Favorite pokémons');
    expect(textElement).toBeInTheDocument();
  });

  it('5- Se a aplicação redireciona à página Not Found.', () => {
    renderWithRouter(<NotFound />);
    const textElement = screen.getByText('Page requested not found');
    expect(textElement).toBeInTheDocument();
  });
});
