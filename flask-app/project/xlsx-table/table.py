from openpyxl import load_workbook
from openpyxl.worksheet.dimensions import ColumnDimension, DimensionHolder
from openpyxl.utils import get_column_letter
import os
from copy import copy


class Staf:
    def __init__(self, name, position, bid):
        self.name = name
        self.position = position
        self.bid = bid


staf = [Staf('Dick', 'Big', 0.5), Staf('Lol', 'kek', 1), Staf('Yaga', 'Baba', 0.33), Staf('Dad', 'Papa', 2)]
print(staf[2].name)
weekends = [1, 2, 12, 13, 20, 21, 28, 31]
date = "01.01.2022"
# !!! все что выше брать из бд !!!


os.chdir(r"xlsx-table")  # переходим в текущую дерикторию иначе блядь не работает
wb_template = load_workbook(filename='template.xlsx')  # rename to Sample
ws = wb_template.active
print(ws)
print(ws['B1' + str(2)].value)


def add_weekends_data(weekends):
    '''
    Fills user weekends

    :param weekends: list of weekends
    :return:filled weekends
    '''
    row_weekends = ws["E16":"AQ16"]
    row = ws["E17":"AQ17"]

    for cell in range(row_weekends[0].__len__()):
        if row_weekends[0][cell].value in weekends:
            row[0][cell].value = "В"


# def huita(n):
#     callnumber = ws["M" + str(21 + n)].value
#     bid = ws["U" + str(21 + n)].value
#     sign = ws["AA" + str(21 + n)].value
#     transcript = ws["AI" + str(21 + n)].value
#     date = ws["AL" + str(20 + n)].value
#
#     ws.merge_cells(None, 12, 22 + n, 15, 22 + n)
#     # ws.merge_cells('M22:P22')
#     ws["M" + str(22 + n)].value = callnumber
#     # ws.unmerge_cells('M21:P21')
#     ws.unmerge_cells(None, 12, 21 + n, 15, 21 + n)

    # ws.merge_cells(None, 'AA', 22 + n, "AE", 22 + n)
    # ws["AA" + str(22 + n)].value = sign
    # ws.unmerge_cells(None, 'AA', 21 + n, "AE", 21 + n)
    #
    # ws.merge_cells(None, 'U', 22 + n, "Y", 22 + n)
    # ws["U" + str(22 + n)].value = bid
    # ws.unmerge_cells(None, 'U', 21 + n, "Y", 21 + n)
    #
    # ws.merge_cells(None, 'AI', 22 + n, "AK", 23 + n)
    # ws["AI" + str(22 + n)].value = transcript
    # ws.unmerge_cells(None, 'AI', 21 + n, "AK", 22 + n)
    #
    # ws.merge_cells(None, 'AL', 21 + n, "AQ", 21 + n)
    # ws["AL" + str(21 + n)].value = date
    # ws.unmerge_cells(None, 'AL', 20 + n, "AL", 20 + n)


def write_data_to_file(data):
    ws['AF9'].value = data[2]
    count = 0
    for s in data[0]:
        # huita(count)
        count += 1
        ws.insert_rows(17, amount=1)
        cells = ws['A18': 'AQ18']
        new_cells = ws['A17': 'AQ17']
        cell_style(cells, new_cells)
        ws['B17'].value = s.name
        ws['C17'].value = s.position
        ws['D17'].value = s.bid
        add_weekends_data(weekends)


def cell_style(cells, new_cells):
    '''
    Change the style of cell to example cell style

    :param cells: range of example cells style
    :param new_cells: range of cells to be styled
    :return: range styled cells as new_cells
    '''
    for c in range(cells[0].__len__()):
        if cells[0][c].has_style:
            new_cells[0][c].font = copy(cells[0][c].font)
            new_cells[0][c].border = copy(cells[0][c].border)
            new_cells[0][c].fill = copy(cells[0][c].fill)
            new_cells[0][c].number_format = copy(cells[0][c].number_format)
            new_cells[0][c].protection = copy(cells[0][c].protection)
            new_cells[0][c].alignment = copy(cells[0][c].alignment)
    return new_cells


dim_holder = DimensionHolder(ws)


# unused
def cell_size():
    for col in range(ws.min_column, ws.max_column + 1):
        dim_holder[get_column_letter(col)] = ColumnDimension(ws, min=col, max=col, width=20)

    ws.column_dimensions = dim_holder


def save_file(month):
    '''
    Save file as NAME

    :param month: the reporting month
    :return: new file
    '''
    table_filename = 'Производственный календарь {}.xlsx'.format(month)
    wb_template.save(table_filename)


month = "Январь"
data = [staf, weekends, date]
cells = ws['A18': 'AQ18']
# print(cells.value)
write_data_to_file(data)
save_file(month)
