# East Asian Typography Timeline

This project is a web application that visualizes key events in the history of East Asian typography. It allows users to explore a timeline of significant developments and figures in Chinese, Japanese, and Korean typography.

## Technologies Used

- HTML
- CSS
- JavaScript

## File Structure

- `index.html`: Contains the main structure of the web page.
- `style.css`: Defines the styles for the visual presentation of the timeline.
- `data.js`: Stores the primary dataset for the timeline events. Each entry includes information like the nation, year, description of the event, and citations.
- `subdata.js`: Contains supplementary data, such as historical periods and conflicts, that are displayed on the timeline.

## How to Use

- The timeline displays events sorted by year.
- You can click on the country names (china, japan, korea) at the top to filter events specific to that country. Clicking the main title "동아시아 타이포그래피 연표" will reset the filter to show all events.
- Hovering over an event on the timeline will display more detailed information, including a description, examples (if available), and source citations.
- The timeline is draggable horizontally and vertically to navigate through different time periods and events.
- A year indicator follows the mouse cursor, and a vertical line tracks the cursor's position on the timeline.

## Future Improvements

- Implement search functionality to find specific events or keywords.
- Add more detailed information and images for each event.
- Enhance mobile responsiveness.
