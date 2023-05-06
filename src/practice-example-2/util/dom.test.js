// @vitest-environment happy-dom

import { it, expect, beforeEach, test } from "vitest";
import fs from 'fs'
import path from 'path'

import { showError } from "./dom";
import { Window } from 'happy-dom'

const htmlDocPath = path.join(process.cwd(), 'src/practice-example-2/index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;

// using vi, stub global document with mocked document - with test content
vi.stubGlobal('document', document)

beforeEach(() => {
    document.body.innerHTML = '';
    document.write(htmlDocumentContent);
  
    console.log("beforeAll()");
  });

  describe.concurrent("showError", () => { 
    it('should add an error paragraph to the id="errors" element', () => {
        showError('test');
    
        const errorsEl = document.getElementById('errors')
        const errorParagraph = errorsEl.firstElementChild;
    
        expect(errorParagraph).not.toBeNull();
    })
    
    it('should not contain an error paragraph initially', () => {
    
        const errorsEl = document.getElementById('errors')
        const errorParagraph = errorsEl.firstElementChild;
    
        expect(errorParagraph).toBeNull();
    })
    
    it('should output the provided message in the error paragraph', () => {
        const testErrorMessage = 'Test'
    
        showError(testErrorMessage)
    
        const errorsEl = document.getElementById('errors')
        const errorParagraph = errorsEl.firstElementChild;
    
        expect(errorParagraph.textContent).toBe(testErrorMessage);
    })
  })

