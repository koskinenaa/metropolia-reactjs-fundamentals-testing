import { render, screen, fireEvent } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import App from './App';

expect.extend(matchers);

test('renders App component', () => {
    render(<App />);
    const header = screen.getByText('My Todolist');

    expect(header).toBeInTheDocument();
});

function mockToDoItem(text) {
    const desc = screen.getByPlaceholderText('Description');
    fireEvent.change(desc, { target: { value: text } });

    const date = screen.getByPlaceholderText('Date');
    fireEvent.change(date, { target: { value: '29.12.2023' } });

    const status = screen.getByPlaceholderText('Status');
    fireEvent.change(status, { target: { value: 'Open' } });

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);
}

test('add todo', () => {
    render(<App />);

    mockToDoItem('Go to coffee');

    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('Go to coffee');
});

test('clear todos', () => {
    render(<App />);

    mockToDoItem('Go to coffee');

    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('Go to coffee');

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(table).not.toHaveTextContent('Go to coffee');
});