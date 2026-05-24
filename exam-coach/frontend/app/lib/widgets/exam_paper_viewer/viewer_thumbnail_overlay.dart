import 'dart:ui';
import 'package:flutter/material.dart';
import '../../models/exam_paper_model.dart';
import '../../config/theme.dart';

class ViewerThumbnailOverlay extends StatelessWidget {
  final ExamPaperData paper;
  final int currentPageIndex;
  final void Function(int pageIndex) onSelect;
  final VoidCallback onClose;

  const ViewerThumbnailOverlay({
    super.key,
    required this.paper,
    required this.currentPageIndex,
    required this.onSelect,
    required this.onClose,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: GestureDetector(
        onTap: onClose,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
          child: Container(
            color: Colors.black.withValues(alpha: 0.85),
            child: SafeArea(
              child: GestureDetector(
                onTap: () {},
                child: Column(
                  children: [
                    // Header row
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 16, 8, 12),
                      child: Row(
                        children: [
                          const Text(
                            'ALL PAGES',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              letterSpacing: 1.2,
                              color: Colors.white54,
                            ),
                          ),
                          const Spacer(),
                          IconButton(
                            onPressed: onClose,
                            icon: const Icon(Icons.close_rounded, color: Colors.white70),
                            iconSize: 20,
                          ),
                        ],
                      ),
                    ),

                    // Thumbnail grid
                    Expanded(
                      child: GridView.builder(
                        padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                          childAspectRatio: 0.65,
                        ),
                        itemCount: paper.pages.length,
                        itemBuilder: (context, idx) {
                          final page      = paper.pages[idx];
                          final isCurrent = idx == currentPageIndex;
                          return GestureDetector(
                            onTap: () => onSelect(idx),
                            child: Column(
                              children: [
                                Expanded(
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFFFFEF9),
                                      borderRadius: const BorderRadius.vertical(
                                        top: Radius.circular(4),
                                      ),
                                      border: Border.all(
                                        color: isCurrent
                                            ? AppTheme.brandOf(context)
                                            : Colors.white.withValues(alpha: 0.10),
                                        width: isCurrent ? 2 : 1,
                                      ),
                                    ),
                                    alignment: Alignment.center,
                                    child: Text(
                                      page.blocks.isNotEmpty
                                          ? (page.blocks.first.content ?? 'Page ${page.pageNumber}')
                                          : 'Page ${page.pageNumber}',
                                      maxLines: 3,
                                      overflow: TextOverflow.ellipsis,
                                      textAlign: TextAlign.center,
                                      style: const TextStyle(
                                        fontSize: 9,
                                        color: Color(0xFF555555),
                                        height: 1.4,
                                      ),
                                    ),
                                  ),
                                ),
                                Container(
                                  width: double.infinity,
                                  padding: const EdgeInsets.symmetric(vertical: 5),
                                  decoration: BoxDecoration(
                                    color: isCurrent
                                        ? AppTheme.brandOf(context)
                                        : Colors.black.withValues(alpha: 0.60),
                                    borderRadius: const BorderRadius.vertical(
                                      bottom: Radius.circular(4),
                                    ),
                                  ),
                                  child: Text(
                                    '${page.pageNumber}',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w600,
                                      color: isCurrent ? Colors.white : Colors.white70,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
