# StreamingText

Streaming a text file to client using the ReadableStream() and fs.createReadStream interfaces.

Utilizing ReadableStream over traditional json response is very efficient at transmitting large amounts of data without using too much system resource. ReadableStream also allows us to stream data and perform certain actions on the individual bytes received from the server. This makes it an excellent choice in handling data such as high definition video files and other assets.
