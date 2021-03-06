﻿

(function ($) {
    $.imageGrid = $.imageGrid || {};
    $.imageGrid.cellHoverOverlay = function (grid, item, $cell, options) {
        var defaultOptions = {
            columnsToSpan: 1,
            formatter: defaultCellFormatter
        };
        options = $.extend({}, defaultOptions, options);
        var columnsToSpan = options.columnsToSpan;
        var position = $cell.position();
        var cellsAfter = $cell.nextAll().length;
        var positionFromRight = cellsAfter < columnsToSpan - 1;

        // Remove any old hover-cells that got left behind
        grid.$grid.find('.image-grid-cell-hover').remove();
        var $hoverCell = $(options.formatter(grid, item, $cell, options, positionFromRight));

        $hoverCell
            .width($cell.width() * columnsToSpan)
            .height($cell.height())
            .css('top', position.top + 'px')
            .css('position', 'absolute');
        if (positionFromRight)
            $hoverCell.css('left', position.left - ($cell.width() * (columnsToSpan-1)) + 'px');
        else
            $hoverCell.css('left', position.left + 'px');
        $(document).on('mouseleave', grid.$grid[0].id + ' .image-grid-cell-hover', function() { $hoverCell.remove(); });
        $hoverCell
            .appendTo($('#imageGrid'))
            .mouseleave(function () {
                $hoverCell.remove();
            });

        function defaultCellFormatter(grid, item, $cell, options, positionFromRight) {
            var $html = $('<div class="image-grid-cell-hover">' +
                '<img class="' + (positionFromRight ? 'image-grid-cell-hover-right' : '') + '" height="' + grid.options.cellHeight + '" width="' + grid.options.cellWidth + '" src="' + item.src + '"></img>' +
                '<div class="image-grid-cell-hover-text">' + item.text + '</div>' +
                '</div>');
            return $html;
        }
    };
})(jQuery);