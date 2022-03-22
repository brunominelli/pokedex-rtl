import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import { renderWithRouter } from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('1- Se página contém um heading h2 com o texto Page requested not found.',
    () => {
      renderWithRouter(<NotFound />);
      const elementText = screen
        .getByRole('heading', { name: /Page requested not found/, level: 2 });
      const elementEmoji = screen.getByRole('img', { name: /Crying emoji/ });
      expect(elementText).toBeInTheDocument();
      expect(elementEmoji).toBeInTheDocument();
    });

  it('2- Se página mostra a imagem.', () => {
    renderWithRouter(<NotFound />);
    const element = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(element.src).toContain('kNSeTs31XBZ3G');
  });
});
