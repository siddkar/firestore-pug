import fetch from 'node-fetch';
import XMLHttpRequest from 'xhr2';
import dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

// configuring global object
global.fetch = fetch;
global.XMLHttpRequest = XMLHttpRequest;

export default fetch;
