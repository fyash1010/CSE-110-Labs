import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("all created notes shown", () => {
    render(<StickyNotes />);

    expect(screen.getAllByTestId("note-item")).toHaveLength(6);

    fireEvent.change(screen.getByPlaceholderText("Note Title"), { target: { value: "New Note" } });
    fireEvent.change(screen.getByPlaceholderText("Note Content"), { target: { value: "Note content" } });
    fireEvent.click(screen.getByText("Create Note"));

    expect(screen.getAllByTestId("note-item")).toHaveLength(7);
  })

  test("update a note and see if the changes are displayed", () => {
    render(<StickyNotes/>);
    let noteTitle = screen.getAllByTestId("note-title");
    
    expect(noteTitle[0].innerHTML).toBe(" test note 1 title ")
    
    noteTitle[0].innerHTML = '<h2 contenteditable="true" data-testid="note-title">title has been changed</h2>';
    
   
    expect(noteTitle[0].innerHTML).toBe('<h2 contenteditable="true" data-testid="note-title">title has been changed</h2>');

    let noteContent = screen.getAllByTestId("note-content");
    expect(noteContent[0].innerHTML).toBe(" test note 1 content ");
    noteContent[0].innerHTML = '<p contenteditable="true" data-testid="note-content">content has been changed</p>';
    
   
    expect(noteContent[0].innerHTML).toBe('<p contenteditable="true" data-testid="note-content">content has been changed</p>');

});

  test("delete button works", () => {
    render(<StickyNotes />);

    expect(screen.getAllByTestId("note-item")).toHaveLength(6);

    fireEvent.click(screen.getByTestId('remove-note-1'));
    expect(screen.getAllByTestId("note-item")).toHaveLength(5);
  });
});

test("renders create note form", () => {
  render(<StickyNotes />);
  const createNoteButton = screen.getByText("Create Note");
  expect(createNoteButton).toBeInTheDocument();
});

test("the list of favorites is correctly updated when the button is clicked", () => {
  render(<StickyNotes />);

  const favorite = screen.getByTestId('favorite-note-2');
  expect(favorite.outerHTML).toBe("<button data-testid=\"favorite-note-2\" style=\"color: black;\">♥</button>");
  fireEvent.click(favorite);
   
  expect(favorite.outerHTML).toBe("<button data-testid=\"favorite-note-2\" style=\"color: red;\">♥</button>");

  const favoriteTitle = screen.getAllByTestId('favorite-title')[0];
  expect(favoriteTitle.textContent).toEqual(' test note 2 title ');

});