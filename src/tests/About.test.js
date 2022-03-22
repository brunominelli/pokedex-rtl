import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../renderWithRouter';
import { About } from '../components';

describe('Teste o componente <About.js />.', () => {
  it('1- Se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const element = screen.getByText('About Pokédex');
    expect(element).toBeInTheDocument();
  });

  it('2- Se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const element = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(element).toBeInTheDocument();
  });

  it('3- Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const element = screen.getAllByText(/Pokémons/);
    expect(element).toHaveLength(2);
  });

  it('4- Teste se a página contém a imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);
    const element = screen.getByAltText('Pokédex');
    expect(element).toBeInTheDocument();
  });

  it('5- Se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const element = screen.getByRole('img', { name: /Pokédex/ });
    expect(element.src).toContain('bulbagarden');
  });
});
