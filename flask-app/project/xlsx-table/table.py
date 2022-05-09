from openpyxl import load_workbook
import os
from copy import copy


class Staf:
    def __init__(self, name, position, bid):
        self.name = name
        self.position = position
        self.bid = bid


staf = [Staf('Dick', 'Big', 0.5), Staf('Lol', 'kek', 1), Staf('Yaga', 'Baba', 0.33), Staf('Dad', 'Papa', 2)]
weekends = [1, 2, 12, 13, 20, 21, 28, 31]
date = "01.01.2022"
# !!! все что выше брать из бд !!!

os.chdir(r"xlsx-table")  # переходим в текущую дерикторию иначе блядь не работает
wb_template = load_workbook(filename='template.xlsx')  # rename to Sample
ws = wb_template.active

def add_weekends_data(row,weekends):
    """
    Fills user weekends

    :param row: row for filling
    :param weekends: list of weekends
    :return:filled weekends
    """
    row_weekends = ws["E16":"AQ16"]

    for cell in range(row_weekends[0].__len__()):
        if row_weekends[0][cell].value in weekends:
            row[0][cell].value = "В"


def move_template_data(n):
    """
    Moves static data from template. IDK how it works, but it works

    :param n: count of added users(lines)
    """

    # callnumber = ws["M20"].value
    # bid = ws["U20"].value
    # sign = ws["AA20"].value
    # transcript = ws["AI20"].value
    # date = ws["AL19"].value

    ws.merge_cells(start_row=21 + n, start_column=13, end_row=21 + n, end_column=16)
    # ws["M" + str(20 + n)].value = callnumber
    ws.unmerge_cells("M20:P20")
    ws.merge_cells(start_row=21 + n, start_column=21, end_row=21 + n, end_column=25)
    # ws["U" + str(20 + n)].value = bid
    ws.unmerge_cells("U20:Y20")
    #
    ws.merge_cells(start_row=21 + n, start_column=27, end_row=21 + n, end_column=31)
    # ws["AA" + str(20 + n)].value = sign
    ws.unmerge_cells("AA20:AE20")
    #
    ws.merge_cells(start_row=21 + n, start_column=35, end_row=22 + n, end_column=37)
    # ws["AI" + str(20 + n)].value = transcript
    ws.unmerge_cells("AI20:AK21")
    #
    ws.merge_cells(start_row=20 + n, start_column=38, end_row=20 + n, end_column=43)
    # ws["AL" + str(19 + n)].value = date
    ws.unmerge_cells("AL19:AQ19")


def format_cells(n):
    """
    Format cells in row

    :param n: row number
    """
    example_row = ws.row_dimensions[n]
    ws.row_dimensions[n + 1] = example_row


def ins_rows(count):
    """
    Insert rows, format and styles them

    :param count: number of rows to insert
    """
    move_template_data(count - 2)
    for s in range(count - 1):
        ws.insert_rows(17, amount=1)
        cells = ws['A18': 'AQ18']
        new_cells = ws['A17': 'AQ17']
        cell_style(cells, new_cells)
        format_cells(17 + s)
        format_cells(20 + s)


def write_data_to_file(data):
    """
    Write data to woeksheet

    :param data: DB data
    """
    ws['AF9'].value = data[2]
    count = 0
    ins_rows(data[0].__len__())
    for s in data[0]:
        count += 1
        ws["A"+str(16+count)].value = count
        ws['B'+str(16+count)].value = s.name
        ws['C'+str(16+count)].value = s.position
        ws['D'+str(16+count)].value = s.bid
        row=ws["E"+str(16+count)+":AI"+str(16+count)]
        add_weekends_data(row,weekends)
        ws["AJ" + str(16 + count)].value = "01"
        # ws["AK" + str(16 + count)].value = "=ЦЕЛОЕ(РАЗНДАТ($AF$9;$AI$9;'d')+ 1)-СЧЁТЕСЛИ(E"+str(16+count)+":AI"+str(16+count)+";'В')-AM"+str(16+count)+"-AO"+str(16+count)+"-AQ"+str(16+count)
        # print(ws["AK" + str(16 + count)].value)


def cell_style(cells, new_cells):
    """
    Change the style of cell to example cell style

    :param cells: range of example cells style
    :param new_cells: range of cells to be styled
    :return: range styled cells as new_cells
    """
    for c in range(cells[0].__len__()):
        if cells[0][c].has_style:
            new_cells[0][c].font = copy(cells[0][c].font)
            new_cells[0][c].border = copy(cells[0][c].border)
            new_cells[0][c].fill = copy(cells[0][c].fill)
            new_cells[0][c].number_format = copy(cells[0][c].number_format)
            new_cells[0][c].protection = copy(cells[0][c].protection)
            new_cells[0][c].alignment = copy(cells[0][c].alignment)
    return new_cells


def save_file(month):
    """
    Save file as NAME

    :param month: the reporting month
    :return: new file
    """
    table_filename = 'Производственный календарь {}.xlsx'.format(month)
    wb_template.save(table_filename)


month = "Январь"
data = [staf, weekends, date]
write_data_to_file(data)
save_file(month)
