import { Radio, TableCell, TableRow } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

function AttendanceTableHeading(props) {
  const { selectedRadio, onChange } = props;

  return (
    <TableRow>
      <TableCell className="bg-transparent text-white font-poppins">Roll No.</TableCell>
      <TableCell className="bg-transparent text-white font-poppins">Name</TableCell>
      <TableCell className="bg-transparent text-white font-poppins">
        <div className="flex items-center">
        <Radio
            value="p"
            checked={selectedRadio === 'p'}
            onChange={onChange}
            name="radio-attendance"
            inputProps={{ 'aria-label': 'P' }}
            id="radio-p"
            sx={{
              color: green[300], // Set to the green color
              '&.Mui-checked': {
                color: green[500], // Set to a darker green when checked
              },
            }}
          />
          <label className="cursor-pointer select-none" htmlFor="radio-p">
            Present
          </label>
        </div>
      </TableCell>
      <TableCell className="bg-transparent text-white font-poppins">
        <div className="flex items-center">
        <Radio
            value="a"
            checked={selectedRadio === 'a'}
            onChange={onChange}
            name="radio-attendance"
            inputProps={{ 'aria-label': 'A' }}
            id="radio-a"
            sx={{
              color: red[300], // Set to the red color
              '&.Mui-checked': {
                color: red[500], // Set to a darker red when checked
              },
            }}
          />
          <label className="cursor-pointer select-none" htmlFor="radio-a">
            Absent
          </label>
        </div>
      </TableCell>
      <TableCell className="bg-transparent text-white font-poppins">
        <div className="flex items-center">
        <Radio
            value="l"
            checked={selectedRadio === 'l'}
            onChange={onChange}
            name="radio-attendance"
            inputProps={{ 'aria-label': 'L' }}
            id="radio-l"
            sx={{
              color: yellow[700], // Set to the yellow color
              '&.Mui-checked': {
                color: yellow[700], // Set to a darker yellow when checked
              },
            }}
          />
          <label className="cursor-pointer select-none" htmlFor="radio-l">
            Leave
          </label>
        </div>
      </TableCell>
    
    </TableRow>
  );
}

export default AttendanceTableHeading;
